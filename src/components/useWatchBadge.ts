'use client';

import { useMemo } from 'react';
import { alerts, misinfoItems } from '@/data/mockData';
import { useFilters, useSnooze } from './Providers';

export function useWatchBadge() {
  const { filters } = useFilters();
  const { isSnoozed } = useSnooze();

  return useMemo(() => {
    const highAlerts = alerts.filter((a) => {
      if (a.severity !== 'HIGH') return false;
      if (isSnoozed(`alert-${a.id}`)) return false;
      if (filters.ministry !== 'All Ministries' && !(a.ministries || []).includes(filters.ministry)) return false;
      if (filters.region !== 'All Regions' && a.region !== filters.region) return false;
      return true;
    }).length;

    const misinfo = misinfoItems.filter((m) => {
      if (isSnoozed(`misinfo-${m.id}`)) return false;
      if (filters.ministry !== 'All Ministries' && !(m.ministries || []).includes(filters.ministry)) return false;
      if (filters.region !== 'All Regions' && m.region !== filters.region) return false;
      return true;
    }).length;

    return highAlerts + misinfo;
  }, [filters, isSnoozed]);
}
