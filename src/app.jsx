import './index.html'
import './app.scss'

/*
import xs from 'xstream'

const one = xs.of(1)
const two = xs.of(2)

combine({one, two}).subscribe({next: (it) => console.log(it)})
*/


import 'whatwg-fetch'

import { h, render, Component } from 'preact'
import xs from 'xstream'
import {listenC} from './utils'
import {count, doIncr, doDecr} from './count'

@listenC({count})
class App extends Component {
	render() {
		const {count} = this.props
		return (
			<div>
				<button onClick={() => doIncr(1)}>+</button>
				<h1>{count}</h1>
				<button onClick={() => doDecr(1)}>-</button>
			</div>
		)
	}
}

render(<App />, document.getElementById('app'))
