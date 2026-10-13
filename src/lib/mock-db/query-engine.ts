import { QueryOptions } from './types';

/**
 * In-memory query engine supporting where clauses, multi-field search, sorting, and pagination
 */
export function executeQuery<T>(items: T[], options?: QueryOptions<T>): T[] {
  if (!options) return [...items];

  let results = [...items];

  // 1. Where filters
  if (options.where) {
    if (typeof options.where === 'function') {
      results = results.filter(options.where);
    } else {
      const filterObj = options.where;
      results = results.filter((item) => {
        for (const key of Object.keys(filterObj) as (keyof T)[]) {
          const expectedVal = filterObj[key];
          if (expectedVal !== undefined && item[key] !== expectedVal) {
            return false;
          }
        }
        return true;
      });
    }
  }

  // 2. Search query across specified fields
  if (options.search && options.search.query.trim()) {
    const q = options.search.query.toLowerCase().trim();
    const fields = options.search.fields;

    results = results.filter((item) => {
      return fields.some((field) => {
        const val = item[field];
        if (typeof val === 'string') {
          return val.toLowerCase().includes(q);
        }
        if (typeof val === 'number') {
          return String(val).includes(q);
        }
        return false;
      });
    });
  }

  // 3. Sorting
  if (options.orderBy && options.orderBy.field) {
    const { field, direction = 'asc' } = options.orderBy;
    const factor = direction === 'desc' ? -1 : 1;

    results.sort((a, b) => {
      // Support nested field like record.wins if passed as a string
      const fieldStr = String(field);
      let valA: any = a[field as keyof T];
      let valB: any = b[field as keyof T];

      if (fieldStr.includes('.')) {
        const parts = fieldStr.split('.');
        valA = parts.reduce((acc, part) => acc?.[part], a as any);
        valB = parts.reduce((acc, part) => acc?.[part], b as any);
      }

      if (valA === valB) return 0;
      if (valA === undefined || valA === null) return 1 * factor;
      if (valB === undefined || valB === null) return -1 * factor;

      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB) * factor;
      }
      return (valA > valB ? 1 : -1) * factor;
    });
  }

  // 4. Pagination: skip & take
  if (options.skip !== undefined || options.take !== undefined) {
    const skip = options.skip || 0;
    const take = options.take !== undefined ? options.take : results.length;
    results = results.slice(skip, skip + take);
  }

  return results;
}
