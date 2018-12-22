import { Selector } from 'testcafe';

fixture `Test editing tags`
  .page('http://localhost:3000/#/e2e-suite/edit-tag');

test('test to edit a tag', async t => {

  // we sould see a tag on startup
  await t.expect(Selector('.edit-tag .ti-tags li').count).eql(2);

  // the text of the tag should be 'a tag'
  await t.expect(Selector('.edit-tag .ti-tags li span').textContent).eql('a tag');

  const changeTag = async (text) => {
    await t
      .click(Selector('.edit-tag .ti-tags li:nth-child(1)'))
      .pressKey('ctrl+a delete')
      .typeText(Selector('.edit-tag .ti-tags li:nth-child(1)'), text);
  };

  // let's see if it discards on blur
  await changeTag('test');
  await t
    .click(Selector('.edit-tag'))
    .expect(Selector('.edit-tag .ti-tags li span').textContent).eql('a tag');

  // let's see if it discards when clicking discard icon
  await changeTag('test');
  await t
    .expect(Selector('.edit-tag .ti-tags li:nth-child(1) .ti-icon-close').visible).eql(false)
    .expect(Selector('.edit-tag .ti-tags li:nth-child(1) .ti-icon-undo').visible).eql(true)
    .click(Selector('.edit-tag .ti-tags li:nth-child(1) .ti-icon-undo'))
    .expect(Selector('.edit-tag .ti-tags li span').textContent).eql('a tag');

  // let's see if the tag is changed when enter is pressed
  await changeTag('test');
  await t
    .pressKey('enter')
    .expect(Selector('.edit-tag .ti-tags li:nth-child(1) .ti-icon-close').visible).eql(true)
    .expect(Selector('.edit-tag .ti-tags li:nth-child(1) .ti-icon-undo').visible).eql(false)
    .expect(Selector('.edit-tag .ti-tags li span').textContent).eql('test');
});
