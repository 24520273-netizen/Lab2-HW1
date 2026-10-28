# AI Failure Audit

## Purpose

This document records verified defects identified during the development of the Production Enterprise Data-Grid. Each defect was detected through code review, browser testing, DevTools inspection, accessibility auditing, Git history analysis, or build and dependency diagnostics.

The purpose of this audit is to demonstrate that generated or scaffolded code was not accepted blindly. Each issue documented below occurred during the actual project development process, was diagnosed using concrete evidence, and was corrected before final verification.

---

## Defect 1 - Incompatible TypeScript and ESLint Dependency Versions

### Defect Description

During the initial Vite project setup, the generated dependency tree included TypeScript 7.0.2 while the installed `typescript-eslint` version only accepted TypeScript versions below 6.1.0.

As a result, npm could not resolve the dependency tree and the initial project installation failed.

### Problematic Code

The generated dependency combination included:

```json
{
  "devDependencies": {
    "typescript": "~7.0.2",
    "typescript-eslint": "^8.72.0"
  }
}
```

The installation output reported that `typescript-eslint@8.72.1` required:

```text
typescript >=4.8.4 <6.1.0
```

while the project attempted to use:

```text
typescript 7.0.2
```

### Risk

The incompatible dependency versions prevented the project from installing successfully.

This caused:

- the React project setup to fail,
- the development server to remain unavailable,
- TypeScript compilation to be unavailable,
- further feature development to be blocked.

Using `--force` or `--legacy-peer-deps` would have hidden the compatibility problem instead of resolving it correctly.

### Diagnostic Method

The defect was detected from the npm installation output during project scaffolding.

npm returned:

```text
ERESOLVE unable to resolve dependency tree
```

The diagnostic output showed that the root project required TypeScript 7.0.2 while `typescript-eslint` required a TypeScript version lower than 6.1.0.

The dependency versions were reviewed instead of bypassing the error with force-install options.

### Refactored Solution

The TypeScript version was changed to a compatible version:

```json
{
  "devDependencies": {
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.72.0"
  }
}
```

The incomplete installation artifacts were removed and the dependencies were installed again normally.

### Verification

After correcting the TypeScript version:

```powershell
npm.cmd install
```

completed successfully.

The project then successfully ran:

```powershell
npm.cmd run dev
```

and:

```powershell
npm.cmd run build
```

without dependency-resolution or TypeScript setup errors.

---

## Defect 2 - Duplicate Declarations in the Sample Data Module

### Defect Description

During development, a full replacement version of `src/data/sampleData.ts` was appended to the existing file instead of replacing the previous content.

This caused the same import and exported variables to be declared more than once in the same module.

The affected declarations included:

```ts
import type { ColumnDef } from '../components/DataGrid';
```

```ts
export const employees: Employee[] = [
```

and:

```ts
export const employeeColumns: ColumnDef<Employee>[] = [
```

The same declarations appeared again later in the same file.

### Problematic Code

The module contained duplicate declarations equivalent to the following actual repeated declarations:

```ts
import type { ColumnDef } from '../components/DataGrid';

export const employees: Employee[] = [
```

and later in the same file:

```ts
import type { ColumnDef } from '../components/DataGrid';

export const employees: Employee[] = [
```

The same duplication also occurred for:

```ts
export const employeeColumns: ColumnDef<Employee>[] = [
```

### Risk

The duplicate declarations prevented TypeScript compilation.

The compiler reported errors including:

```text
TS2300: Duplicate identifier 'ColumnDef'
```

and:

```text
TS2451: Cannot redeclare block-scoped variable 'employees'
```

as well as:

```text
TS2451: Cannot redeclare block-scoped variable 'employeeColumns'
```

Because the project could not compile, no runtime verification could continue until the file was corrected.

This also demonstrated a workflow risk when applying AI-generated full-file replacements: appending generated content instead of replacing the previous file can create structurally invalid modules.

### Diagnostic Method

The issue was detected by running:

```powershell
npm.cmd run build
```

The TypeScript compiler reported the same declarations at two different locations in `src/data/sampleData.ts`.

The file was then manually inspected and confirmed to contain two copies of the module content.

### Refactored Solution

The duplicated content was removed so that the module contained only one import and one declaration for each exported value.

The corrected module uses a single import:

```ts
import type { ColumnDef } from '../components/DataGrid';
```

and a single sample-data declaration:

```ts
export const employees: Employee[] = [
```

and a single columns declaration:

```ts
export const employeeColumns: ColumnDef<Employee>[] = [
```

The full-file replacement workflow was also corrected by replacing the existing content instead of appending the new version.

### Verification

After removing the duplicated module content:

```powershell
npm.cmd run build
```

completed successfully.

The `TS2300` and `TS2451` errors no longer appeared.

The application continued to load the same Employee data and column definitions correctly.

---

## Defect 3 - Dynamic Grid Status Changes Were Not Exposed as Status Messages

### Defect Description

Before accessibility hardening, two pieces of dynamically changing UI feedback were rendered as ordinary paragraphs:

- the selected employee message,
- the current pagination information.

The previous implementation rendered the selection feedback as:

```tsx
<p className="selection-feedback">
  {selectedEmployee
    ? `Selected employee: ${selectedEmployee.name}`
    : 'No employee selected.'}
</p>
```

The pagination information was rendered as:

```tsx
<p>
  Page {currentPage} of {totalPages}
</p>
```

These text values changed after user interaction, but they did not have live status semantics.

### Risk

A sighted user could see the updated selection or page information immediately, but assistive technology might not automatically announce the change when keyboard focus remained on the grid cell, selection control, or pagination button.

This could create a mismatch between visual feedback and screen-reader feedback.

Examples included:

```text
Selected employee: Carla Nguyen
```

and:

```text
Page 2 of 2
```

changing without an explicit status semantic.

### Diagnostic Method

The issue was identified during the Step 9 accessibility audit.

Git history was used to verify the actual code change between:

```text
9ec2099 feat(a11y): add keyboard grid navigation
```

and:

```text
0b81d65 fix(a11y): improve grid accessibility
```

The Git diff confirmed that `role="status"` was added to both dynamically changing messages.

Chrome DevTools and manual keyboard testing were also used to verify the surrounding accessibility structure.

### Refactored Solution

The selection feedback was changed to:

```tsx
<p
  className="selection-feedback"
  role="status"
>
  {selectedEmployee
    ? `Selected employee: ${selectedEmployee.name}`
    : 'No employee selected.'}
</p>
```

The pagination information was changed to:

```tsx
<p role="status">
  Page {currentPage} of {totalPages}
</p>
```

No additional custom live-region implementation was added because the native status role provides the required status semantics without unnecessary ARIA complexity.

### Verification

The fix was verified through Git diff inspection and Chrome DevTools accessibility testing.

The application was regression-tested to confirm that:

- row selection still worked with mouse interaction,
- row selection still worked with Enter and Space,
- pagination still worked,
- sorting still worked,
- filtering still worked,
- grid arrow navigation still worked,
- semantic table structure remained unchanged.

The initial Lighthouse Accessibility audit subsequently reported:

```text
100
```

The Lighthouse result was treated as automated evidence only and not as proof of complete WCAG 2.2 Level AA conformance.

---

## Audit Summary

Three verified defects were documented:

1. An incompatible TypeScript and `typescript-eslint` dependency combination prevented project installation.
2. Duplicate module declarations prevented TypeScript compilation.
3. Dynamic selection and pagination feedback lacked status semantics for assistive technology.

All three issues were identified from actual development evidence rather than hypothetical examples.

The current implementation continues to preserve:

- semantic HTML table structure,
- sorting,
- filtering,
- pagination,
- row selection,
- keyboard grid navigation,
- accessible control names,
- visible keyboard focus,
- stable Employee row identity,
- safe React text rendering.

No verified XSS defect, event-listener leak, or `Math.random()` key defect was added to this audit because the available project evidence did not demonstrate that those defects actually occurred.