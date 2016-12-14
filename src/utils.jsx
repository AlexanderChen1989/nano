import xs from 'xstream'
import { h, Component } from 'preact'

export const listen = (store) => (Wrappered) => {
	return class Wrapper extends Component {
		state = {next: null}

		componentDidMount() {
			this.subscription = store.subscribe(this)
		}

		componentWillUnmount() {
			this.subscription.unsubscribe()
		}

		next = (next) => {
			this.setState({next, store})
		}

		render() {
			if (this.state.next) {
				console.log(Wrappered)
				return <Wrappered {...this.state.next} />
			}
			return null
		}
	}
}

export const listenC = (obj) => (Wrappered) => {
	return listen(combine(obj))(Wrappered)
}


export const combine = (obj) => {
	const keys = []
	const values = []

	for (var k in obj) {
		if (!obj.hasOwnProperty(k)) {
			continue
		}
		keys.push(k)
		values.push(obj[k])
	}

	return xs.combine(...values)
		.map(vals => {
			const obj = {}
			vals.forEach((val, i) => {
				obj[keys[i]] = val
			})
			return obj
		})
}

export class Dispatcher {
	constructor() {
		this._stream = xs.create()
		this._actions = {}
	}

	dispatch = (type, data) => {
		this._stream.shamefullySendNext({type, data})
	}

	action = (...types) => {
		const actions = {}
		types.forEach((type) => {
			actions[type] = type
		})
		this._actions = Object.assign(this._actions, actions)
		return this._actions
	}

	handle = (_type, handleFn) => {
		if (!this._actions[_type]) {
			throw `action type ${_type} not defined`
		}
		return this._stream
			.filter(({type}) => type === _type)
			.map(({data}) => handleFn(data))
	}

	get stream() {
		return this._stream
	}

	get actions() {
		return this._actions
	}
}
