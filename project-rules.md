# Project Rules

## Project Goal

Build a production-quality accessible enterprise data grid using React and TypeScript.

The implementation must satisfy the homework specification without adding unnecessary features.

## Core Technology

- React
- TypeScript
- Vite
- Semantic HTML
- Native React event handling
- CSS for presentation and visible focus states

Do not introduce additional libraries unless they are strictly required by the specification.

## Data Grid Contract

Prefer the following base contract:

```ts
export interface ColumnDef<T> {
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
}

export interface DataGridProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowSelect?: (item: T) => void;
  ariaLabel: string;
}
The contract may only be changed when a homework requirement cannot be implemented correctly without the change.

Any contract change must be documented and justified.
Required Features
The data grid must support:
- Semantic table structure
- Column sorting
- Filtering
- Pagination
- Keyboard navigation
- Row selection or interaction
- Screen reader support
- WCAG 2.2 Level AA accessibility
Semantic HTML Rules
Use semantic HTML wherever possible.

Required elements include:
- table
- thead
- tbody
- tr
- th
- td
- button for interactive controls when appropriate
Do not replace the table structure with generic div elements.

Do not create unnecessary wrapper elements.
Accessibility Rules
The implementation must aim for WCAG 2.2 Level AA.

Requirements include:
- Normal text contrast of at least 4.5:1
- Full keyboard accessibility
- Clearly visible keyboard focus
- Accessible names for interactive controls
- Correct labels for form controls
- Screen reader support
- Correct semantic relationships
- Accessible sorting state
- Accessible table or grid name using ariaLabel
Use ARIA only when necessary.

Prefer native HTML semantics over unnecessary ARIA.

Do not add ARIA roles that conflict with native element semantics.
Sorting Rules
- Only columns with sortable: true may be sorted.
- Support ascending sorting.
- Support descending sorting.
- Sortable headers must be keyboard accessible.
- Prefer a semantic button inside a sortable column header.
- Sorting state must be available to assistive technologies.
- Do not mutate the original data array.
Filtering Rules
- Filtering must use an accessible input or control.
- Every filter control must have a proper label or accessible name.
- Filtering must work together with sorting.
- Do not implement advanced search features.
- Do not use raw innerHTML.
Pagination Rules
Pagination must provide:
- Previous button
- Next button
- Current page information
- Disabled Previous button on the first page
- Disabled Next button on the last page
Pagination must work correctly with filtering and sorting.

The current page must remain within the valid page range after filtering changes the number of available pages.
Keyboard Navigation Rules
When keyboard focus is inside the data grid:
- ArrowUp moves focus to the cell above.
- ArrowDown moves focus to the cell below.
- ArrowLeft moves focus to the previous cell.
- ArrowRight moves focus to the next cell.
- Enter performs the appropriate row selection action.
- Space performs the appropriate toggle or selection interaction.
Use:
- keydown
- event.key
Do not use:
- keypress
- event.keyCode
Keyboard interaction must not break mouse interaction.
Security and JavaScript Rules
Do not use:
- var
- Implicit global variables
- keypress
- event.keyCode
- Raw innerHTML for user-generated content
- Inline event handlers
- Outdated Babel standalone
Prefer:
- const
- let
- React event handlers
- Safe text rendering
- React's default escaping behavior
React Rules
- Use functional components.
- Use TypeScript types explicitly where they improve safety.
- Keep components focused on a single responsibility.
- Avoid unnecessary state.
- Avoid mutating props.
- Avoid unstable React keys.
- Prefer persistent entity identifiers for row keys.
- Do not use Math.random() as a React key.
- Avoid array indexes as keys when rows can change order.
Scope Rules
Do not add features that are outside the homework specification.

Do not add:
- Backend services
- Databases
- Authentication
- API servers
- Advanced search
- CSV export
- Drag-and-drop columns
- Column resizing
- Theme systems
- Unrequested features
Engineering Workflow
Development must follow:
1. Functional Slicing
2. Contract First
3. Atomic Implementation
4. Independent Verification
Only one small task should be implemented at a time.

Each task must be verified before starting the next task.

Do not implement the entire data grid in one change.
Git Rules
Use atomic commits.

Do not combine several major features in a single commit.

Use Conventional Commits when appropriate.

Examples:
chore(project): add project rules and task decomposition
feat(grid): implement semantic data grid structure
feat(grid): add column sorting
feat(grid): add accessible filtering
feat(grid): implement pagination
feat(a11y): add keyboard grid navigation
fix(a11y): improve grid accessibility

AI Failure Audit Rules
The completed project must contain:
AI_FAILURE_AUDIT.md

Only document defects that actually existed in the project.

Do not invent defects.

Possible areas to inspect include:
- XSS risks
- Event listener or memory leaks
- Unstable React keys
- Accessibility defects
- Missing accessible names
- Incorrect focus behavior
- Incorrect keyboard interaction
- Incorrect ARIA semantics
Each documented defect should include:
- Defect Title
- Defect Description
- Problematic Code
- Diagnostic Method
- Risk
- Refactored Solution
- Verification
Lighthouse Rules
The final project must be tested using Chrome Lighthouse.

Target scores:
- Accessibility: 100/100
- Best Practices: 100/100
Never claim a score of 100 unless an actual Lighthouse run confirms it.

If the target is not reached, inspect the real Lighthouse report before applying fixes.
Language Rules
All source code must use English.

This includes:
- File content
- Variable names
- Function names
- Component names
- Comments
- UI text
- Documentation inside the repository