export function getCategoryBadge(category) {
  const map = {
    Minor: 'badge-minor',
    Major: 'badge-major',
    Special: 'badge-special',
  };
  return map[category] || 'badge-major';
}

export function getStatusBadge(status) {
  if (/closed/i.test(status)) return 'badge-closed';
  if (/few slots/i.test(status)) return 'badge-limited';
  return 'badge-open';
}
