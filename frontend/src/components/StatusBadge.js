const StatusBadge = ({ status }) => {
  const color = {
    Pending: 'bg-yellow-400',
    'In Progress': 'bg-blue-400',
    Completed: 'bg-green-500'
  }[status] || 'bg-gray-400';

  return (
    <span className={`text-white py-1 px-3 rounded-full text-sm ${color}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
