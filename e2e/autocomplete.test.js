import { Selector } from 'testcafe';

// checking the default options on getting-started page for a simple tagsinput

fixture `Check autocomplete functionality`
  .page('http://localhost:3000/#/e2e-suite/autocomplete');

test('test autocomplete', async t => {


  /*** check the autocomplete show and hide behaviour ***/

  /* check autocomplete visibility status with empty input and focus input-0 */
  await t
    .click(Selector('.e2e-suite .input-0 .ti-input'))
    .expect(Selector('.e2e-suite .input-0 .ti-autocomplete').exists).eql(false)
    .expect(Selector('.e2e-suite .input-1 .ti-autocomplete').exists).eql(false)
    .expect(Selector('.e2e-suite .input-2 .ti-autocomplete').exists).eql(true);


  /* check autocomplete visibility status with empty input and focus input-1 */
  await t
    .click(Selector('.e2e-suite .input-1 .ti-input'))
    .expect(Selector('.e2e-suite .input-0 .ti-autocomplete').exists).eql(false)
    .expect(Selector('.e2e-suite .input-1 .ti-autocomplete').exists).eql(true)
    .expect(Selector('.e2e-suite .input-2 .ti-autocomplete').exists).eql(true);


  /* check autocomplete visibility status with input and focus input-0 */
  /* input-1 blur and should hide */
  await t
    .typeText(Selector('.e2e-suite .input-0'), 'tag')
    .expect(Selector('.e2e-suite .input-0 .ti-autocomplete').exists).eql(true)
    .expect(Selector('.e2e-suite .input-1 .ti-autocomplete').exists).eql(false)
    .expect(Selector('.e2e-suite .input-2 .ti-autocomplete').exists).eql(true);

  /* clear input from input-0 and check autocomplete visibility status */
  await t
    .click(Selector('.e2e-suite .input-0 input'))
    .pressKey('ctrl+a delete')
    .expect(Selector('.e2e-suite .input-0 .ti-autocomplete').exists).eql(false);

  /* check if input-1 is shown when clicking around on it */
  await t
    .click(Selector('.e2e-suite .input-1 .ti-input'))
    .expect(Selector('.e2e-suite .input-1 .ti-autocomplete').exists).eql(true)
    .click(Selector('.e2e-suite .input-1 .ti-input'))
    .expect(Selector('.e2e-suite .input-1 .ti-autocomplete').exists).eql(true);

  /* check if items are filtered on input-1 and -2 when adding a tag */
  await t
    .click(Selector('.e2e-suite .input-1 .ti-autocomplete li:nth-child(1)'))
    .expect(Selector('.e2e-suite .input-1 .ti-autocomplete').exists).eql(true)
    .expect(Selector('.e2e-suite .input-1 .ti-autocomplete li').count).eql(2)
    .expect(Selector('.e2e-suite .input-2 .ti-autocomplete li').count).eql(4);

  /* on input-0 it should be impossbile to add item-1 again - input-2 allows it */
  await t
    .typeText(Selector('.e2e-suite .input-0'), 'item-1')
    .pressKey('enter')
    .expect(Selector('.e2e-suite .input-0 .ti-tags li').count).eql(2)
    .expect(Selector('.e2e-suite .input-0 .ti-new-tag-input').value).eql('item-1');

  await t
    .click(Selector('.e2e-suite .input-2'))
    .pressKey('enter')
    .expect(Selector('.e2e-suite .input-0 .ti-tags li').count).eql(3)
    .expect(Selector('.e2e-suite .input-2 .ti-tags li').count).eql(3)
    .expect(Selector('.e2e-suite .input-0 .ti-new-tag-input').value).eql('');


  /*** check if its possible to navigate with arrow up and down ***/

  /* do arrow down on input-1 and check which items has the class selected-item */
  await t
    .click(Selector('.e2e-suite .input-2 input'))
    .expect(
      Selector('.e2e-suite .input-2 .ti-autocomplete li:nth-child(1)').hasClass('ti-selected-item')
    ).eql(false)
    .pressKey('down')
    .expect(
      Selector('.e2e-suite .input-2 .ti-autocomplete li:nth-child(1)').hasClass('ti-selected-item')
    ).eql(true);

  /* do arrow down three times and check selected item on input-2 */
  await t
    .pressKey('down').pressKey('down').pressKey('down')
    .expect(
      Selector('.e2e-suite .input-2 .ti-autocomplete li:nth-child(1)').hasClass('ti-selected-item')
    ).eql(false)
    .expect(
      Selector('.e2e-suite .input-2 .ti-autocomplete li:nth-child(4)').hasClass('ti-selected-item')
    ).eql(true);

  /* do arrow down again and check selected item on input-2 (we should be back on top again) */
  await t
    .pressKey('down')
    .expect(
      Selector('.e2e-suite .input-2 .ti-autocomplete li:nth-child(1)').hasClass('ti-selected-item')
    ).eql(true);

  /* do arrow up on input-2 -> we should be back on bottom */
  await t
    .pressKey('up')
    .expect(
      Selector('.e2e-suite .input-2 .ti-autocomplete li:nth-child(4)').hasClass('ti-selected-item')
    ).eql(true);


  /* focus input-1 -> item with index 0 should be selected*/
  await t
    .click(Selector('.e2e-suite .input-1 input'))
    .expect(
      Selector('.e2e-suite .input-1 .ti-autocomplete li:nth-child(1)').hasClass('ti-selected-item')
    ).eql(true);


  /*** check if its possible to add tags with enter from
  autocomplete and input (add-only-from-autocomplete) ***/

  /* enter item- on input-2 and blur -> no tag should be added */
  await t
    .expect(Selector('.e2e-suite .input-1 .ti-tags li').count).eql(3)
    .typeText(Selector('.e2e-suite .input-1'), 'item-')
    .click(Selector('.e2e-suite .input-1 input'))
    .expect(Selector('.e2e-suite .input-1 .ti-tags li').count).eql(3);

  /* adding tags via select and enter from autocomplete should be allowed on input-2  */
  await t
    .pressKey('down')
    .pressKey('enter')
    .expect(Selector('.e2e-suite .input-1 .ti-tags li').count).eql(4)
    .expect(
      Selector('.e2e-suite .input-1 .ti-tags li:nth-child(3) span').textContent
    ).eql('item-3');
});
