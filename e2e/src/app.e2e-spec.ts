import { BiosysClientPage } from './app.po';


describe('biosys-client App', () => {
  let page: BiosysClientPage;

  beforeEach(() => {
    page = new BiosysClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
  });
});
