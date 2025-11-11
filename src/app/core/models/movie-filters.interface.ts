export interface MovieFilters {
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
}

export interface DateRange {
  start: string | null;
  end: string | null;
}