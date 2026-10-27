# Homework 1 - Task Decomposition

## Development Strategy

The project will be implemented using:

1. Functional Slicing
2. Contract First
3. Atomic Implementation
4. Independent Verification

Only one task should be implemented and verified at a time.

---

## Task 1 - Project Setup and Engineering Rules

- [ ] Create the React and TypeScript project.
- [ ] Confirm the development server runs.
- [ ] Add `project-rules.md`.
- [ ] Add `TASK_DECOMPOSITION.md`.
- [ ] Confirm the project has no unnecessary dependencies.
- [ ] Create the initial atomic Git commit.

### Verification

- The Vite development server starts successfully.
- The default application loads in the browser.
- TypeScript compilation succeeds.
- Both documentation files exist at the project root.

### Suggested Commit

```text
chore(project): add project rules and task decomposition
Task 2 - Define the Data Grid Contract
- [ ] Create the DataGrid component module.
- [ ] Define ColumnDef<T>.
- [ ] Define DataGridProps<T>.
- [ ] Preserve the required generic TypeScript contract.
- [ ] Add only the minimum sample data required to render and test the component.
Verification
- TypeScript compiles without errors.
- The generic component accepts typed data and columns.
- No sorting, filtering, pagination, or keyboard navigation is implemented yet.
Suggested Commit
feat(grid): define data grid contract

Task 3 - Implement the Semantic Table Structure
- [ ] Render the data using a semantic table.
- [ ] Add thead.
- [ ] Add tbody.
- [ ] Add tr.
- [ ] Add th with scope="col".
- [ ] Add td.
- [ ] Give the table an accessible name using ariaLabel.
- [ ] Avoid div-based grid simulation.
Verification
- Inspect the DOM in browser DevTools.
- Confirm the required semantic elements exist.
- Confirm data is rendered correctly.
- Inspect the accessibility tree.
- Confirm the table has an accessible name.
Suggested Commit
feat(grid): implement semantic data grid structure

Task 4 - Implement Column Sorting
- [ ] Make only sortable: true columns interactive.
- [ ] Add ascending sorting.
- [ ] Add descending sorting.
- [ ] Use a semantic button for sortable headers.
- [ ] Expose the current sort state to assistive technology.
- [ ] Preserve the original input data.
Verification
- Test sorting with the mouse.
- Test sorting with the keyboard.
- Verify ascending order.
- Verify descending order.
- Verify non-sortable columns cannot be sorted.
- Confirm the original data array is not mutated.
Suggested Commit
feat(grid): add column sorting

Task 5 - Implement Accessible Filtering
- [ ] Add a filter control.
- [ ] Add a visible label or equivalent accessible name.
- [ ] Filter the displayed rows.
- [ ] Make filtering work with the current sorting state.
- [ ] Avoid raw innerHTML.
Verification
- Type text into the filter.
- Confirm matching rows remain visible.
- Confirm non-matching rows are removed from the displayed result.
- Apply sorting and filtering together.
- Inspect the filter control's accessible name.
Suggested Commit
feat(grid): add accessible filtering

Task 6 - Implement Pagination
- [ ] Add Previous button.
- [ ] Add Next button.
- [ ] Add current page information.
- [ ] Disable Previous on the first page.
- [ ] Disable Next on the last page.
- [ ] Make pagination work after sorting.
- [ ] Make pagination work after filtering.
- [ ] Prevent the current page from becoming invalid after filtering.
Verification
- Navigate forward through pages.
- Navigate backward through pages.
- Verify disabled button states.
- Filter the data while on a later page.
- Confirm the current page returns to a valid page when necessary.
Suggested Commit
feat(grid): implement pagination

Task 7 - Implement Row Selection and Interaction
- [ ] Connect row interaction to onRowSelect.
- [ ] Ensure mouse interaction works.
- [ ] Ensure interaction has an appropriate keyboard equivalent.
- [ ] Do not introduce unrelated selection features.
Verification
- Select a row using the mouse.
- Confirm the correct item is passed to onRowSelect.
- Confirm row interaction does not interfere with sorting controls.
Suggested Commit
feat(grid): add row selection

Task 8 - Implement Keyboard Grid Navigation
- [ ] Add focusable grid cells or appropriate interactive focus targets.
- [ ] Implement ArrowUp.
- [ ] Implement ArrowDown.
- [ ] Implement ArrowLeft.
- [ ] Implement ArrowRight.
- [ ] Implement Enter.
- [ ] Implement Space.
- [ ] Use keydown.
- [ ] Use event.key.
- [ ] Preserve mouse interaction.
- [ ] Prevent focus from moving outside valid grid boundaries.
Verification
- Navigate through the grid using only the keyboard.
- Test all four arrow keys.
- Test the first row boundary.
- Test the last row boundary.
- Test the first column boundary.
- Test the last column boundary.
- Test Enter.
- Test Space.
- Confirm mouse interaction still works.
Suggested Commit
feat(a11y): add keyboard grid navigation

Task 9 - Accessibility and Focus Hardening
- [ ] Verify visible keyboard focus.
- [ ] Verify accessible names.
- [ ] Verify sorting announcements.
- [ ] Verify table or grid semantics.
- [ ] Verify screen reader relationships.
- [ ] Check color contrast.
- [ ] Remove unnecessary or conflicting ARIA.
- [ ] Check keyboard focus order.
Verification
- Inspect the browser accessibility tree.
- Navigate the complete component using only the keyboard.
- Inspect visible focus styles.
- Test accessible names in DevTools.
- Check text contrast.
- Run an initial Lighthouse accessibility test.
Suggested Commit
fix(a11y): improve grid accessibility

Task 10 - Create the AI Failure Audit
- [ ] Create AI_FAILURE_AUDIT.md.
- [ ] Inspect the actual project for AI-generated defects.
- [ ] Document only defects that actually occurred.
- [ ] Include diagnostic evidence.
- [ ] Include the corrected implementation.
- [ ] Include verification for each defect.
Verification
- Every documented defect existed in project history or source code.
- Every defect includes all required audit sections.
- Every refactored solution has been verified.
Suggested Commit
docs(audit): add AI failure audit

Task 11 - Lighthouse and Final Verification
- [ ] Run Chrome Lighthouse.
- [ ] Check Accessibility score.
- [ ] Check Best Practices score.
- [ ] Investigate real reported issues if either score is below 100.
- [ ] Fix only verified problems.
- [ ] Repeat Lighthouse after fixes.
- [ ] Perform final keyboard regression testing.
- [ ] Perform final mouse regression testing.
Target
Accessibility: 100/100
Best Practices: 100/100

Do not claim the target scores unless the actual Lighthouse report confirms them.
Verification
- Save evidence of the final Lighthouse report.
- Confirm all required functionality still works after accessibility fixes.
Suggested Commit
test(a11y): verify lighthouse and accessibility requirements