# QuickBooks Customer Sync: Automatic Cleanup

## Orders Page Behavior
On every Orders page load, the application automatically synchronizes customers with QuickBooks Online by POSTing to `/api/quickbooks/sync-customers`. Any local customers not present in QuickBooks are deleted immediately. This ensures the local database only contains customers that exist in QuickBooks, improving data integrity and reducing manual cleanup.

**Operational Note:**
- No grace period for deletion; removals are immediate.
- This behavior is automatic and requires no user intervention.
