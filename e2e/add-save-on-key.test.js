import { Selector } from 'testcafe';

fixture `Check if custom registered trigger keys work`
  .page('http://localhost:3000/#/e2e-suite/add-save-on-key');

test('test the props addOnKey and saveOnKey', async t => {

  // add a tag with the keycode 188 (,)
  await t
    .typeText(Selector('.add-save-on .ti-new-tag-input'), 'test')
    .pressKey(',')
    .expect(Selector('.add-save-on .ti-tags li').count).eql(2)
    .expect(Selector('.add-save-on .ti-tags li:nth-child(1) span').textContent).eql('test');

  // add a tag from autocomplete with keycode 32 (space)
  await t
    .typeText(Selector('.add-save-on .ti-new-tag-input'), 'fr')
    .pressKey('down')
    .pressKey('down')
    .pressKey('space')
    .expect(Selector('.add-save-on .ti-tags li').count).eql(3)
    .expect(Selector('.add-save-on .ti-tags li:nth-child(2) span').textContent).eql('china');

  // edit tag 1 and try to submit with keycode 13 (enter)
  await t
    .click(Selector('.add-save-on .ti-tags li:nth-child(1)'))
    .pressKey('ctrl+a delete')
    .typeText(Selector('.add-save-on .ti-tags li:nth-child(1) .ti-tag-input'), 'test2')
    .pressKey('enter')
    .expect(Selector('.add-save-on .ti-tags li:nth-child(1) .ti-tag-input').exists).eql(true);

  // now submit with keycode 188 (,)
  await t
    .pressKey(',')
    .expect(Selector('.add-save-on .ti-tags li:nth-child(1) .ti-tag-input').exists).eql(false)
    .expect(Selector('.add-save-on .ti-tags li:nth-child(1) span').textContent).eql('test2');
});
