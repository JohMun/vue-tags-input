import { Selector } from 'testcafe';

// checking the default options on getting-started page for a simple tagsinput

fixture `Getting Started`
  .page('http://localhost:3000/#/start');

test('test basic functions', async t => {
  await t
    .typeText(Selector('.getting-started .vue-tags-input .ti-new-tag-input'), 'e2eTag')
    .pressKey('enter')
    .expect(Selector('.getting-started .vue-tags-input .ti-tags li').count).eql(2)
    .expect(Selector('.getting-started .vue-tags-input .ti-tag:nth-child(1) span')
      .textContent).eql('e2eTag');

  // add second tag
  await t
    .typeText(Selector('.getting-started .vue-tags-input .ti-new-tag-input'), 'e2eTag 2')
    .pressKey('enter')
    .expect(Selector('.getting-started .vue-tags-input .ti-tags li').count).eql(3)
    .expect(Selector('.getting-started .vue-tags-input .ti-tag:nth-child(2) span')
      .innerText).eql('e2eTag 2');

  // delete first tag
  await t
    .click(Selector('.getting-started .ti-tag:nth-child(1) .ti-actions .ti-icon-close'))
    .expect(Selector('.getting-started .vue-tags-input .ti-tags li').count).eql(2)
    .expect(Selector('.getting-started .vue-tags-input .ti-tag:nth-child(1) span')
      .innerText).eql('e2eTag 2');

  // add tag on blur
  await t
    .typeText(Selector('.getting-started .vue-tags-input .ti-new-tag-input'), 'e2eTag 3')
    .click(Selector('.getting-started h1'))
    .expect(Selector('.getting-started .vue-tags-input .ti-tags li').count).eql(3)
    .expect(Selector('.getting-started .vue-tags-input .ti-tag:nth-child(2) span')
      .innerText).eql('e2eTag 3');

  // delete last tag on backsspace
  await t
    .click(Selector('.getting-started .vue-tags-input .ti-new-tag-input'))
    .pressKey('backspace')
    .expect(Selector('.getting-started .vue-tags-input .ti-tag:nth-child(2)')
      .hasClass('ti-deletion-mark')).eql(true)
    .wait(2000)
    .expect(Selector('.getting-started .vue-tags-input .ti-tag:nth-child(2)')
      .hasClass('deletion-mark')).eql(false)
    .pressKey('backspace')
    .pressKey('backspace')
    .expect(Selector('.getting-started .vue-tags-input .ti-tags li').count).eql(2);

  // add a tag on paste

  /* testcafe doesnt fire the paste event when setting the option paste: true
    https://github.com/DevExpress/testcafe/issues/2075
  */

  // await t
  //   .typeText(
  //     Selector('.getting-started .vue-tags-input .new-tag-input'), 'fromPaste', { paste: true }
  //   )
  //   .expect(Selector('.getting-started .vue-tags-input .tags li').count).eql(3)
  //   .expect(Selector('.getting-started .vue-tags-input .tag:nth-child(2) span')
  //     .textContent).eql('fromPaste');
});
