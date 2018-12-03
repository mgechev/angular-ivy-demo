import {Component, Input, ɵrenderComponent as renderComponent, Pipe, ɵmarkDirty as markDirty} from '@angular/core';

@Component({
  selector: 'zippy',
  template: `
    <button (click)="toggle()">
      {{title}}
    </button>
    <div [hidden]="!show">
      <ng-content></ng-content>
    </div>
  `,
})
class ChildComponent {
  @Input() title: string;
  show = false;
  toggle() {
    this.show = !this.show;
    markDirty(this);
  }
}

@Pipe({ name: 'capitalize' })
class CapitalizePipe {
  transform(str: string) {
    return str
        .split(' ')
        .filter(s => !!s)
        .map(s => s[0].toUpperCase() + s.slice(1, s.length))
        .join(' ');
  }
}

@Component({
  selector: 'app-cmp',
  template: '<zippy title="Toggle">{{ label | capitalize }}</zippy>',
  directives: [ChildComponent],
  pipes: [CapitalizePipe]
})
class HelloWorld {
  label = 'hello world';
}

renderComponent(HelloWorld);
