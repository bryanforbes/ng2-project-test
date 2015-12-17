import { Component } from 'angular2/core';
import { bootstrap } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS } from 'angular2/router';

@Component({
	selector: 'app',
	template: `Hello`
})
export class App {
}

bootstrap(App, [
	ROUTER_PROVIDERS
]);
