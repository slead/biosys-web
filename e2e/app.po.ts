import { browser, by, element } from 'protractor';

export class BiosysClientPage {
  static navigateTo() {
    return browser.get('/');
  }

  static getParagraphText() {
    return element(by.css('app-root h2')).getText();
  }
}
