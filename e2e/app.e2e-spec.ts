import { CremaPage } from './app.po';

describe('crema App', function() {
  let page: CremaPage;

  beforeEach(() => {
    page = new CremaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
