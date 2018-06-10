import { Selector, ClientFunction } from 'testcafe';

const getLocation = ClientFunction(() => document.location.href);

fixture `Check Docs Navigation`
  .page('http://localhost:3000');

test('Move to page "Getting Started"', async t => {
  await t
    .resizeWindow(1280, 1024)
    .click(Selector('.el-navbar .nav-items li .label span').withText('Getting Started'));

  await t
    .expect(Selector('main .main-content h1').innerText).eql('Getting Started')
    .expect(getLocation()).contains('start');
});
