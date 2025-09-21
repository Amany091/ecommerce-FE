import { BsClipboardCheck, BsClipboardX } from "react-icons/bs";
import { IoMdStopwatch } from "react-icons/io";
import { useSelector } from "react-redux";


const OrderSummaryBox = ({ type, count, label }) => {
  const icon = type === 'completed' ? <BsClipboardCheck />
              : type === 'canceled' ? <BsClipboardX />
              : <IoMdStopwatch />;

  const boxColor = type === 'completed' ? 'bg-green-600' 
                : type === 'canceled' ? 'bg-red-600' 
                : 'bg-yellow-600';

  const iconBgColor = type === 'completed' ? 'bg-green-300'
                   : type === 'canceled' ? 'bg-red-300'
                   : 'bg-yellow-300';

  const iconColor = type === 'completed' ? 'text-green-600'
                  : type === 'canceled' ? 'text-red-500'
                  : 'text-yellow-500';

  return (
    <div className={`flex items-center p-4 rounded-lg ${boxColor} text-white`}>
      <div className={`p-3 rounded-lg ${iconBgColor} mr-2`}>
        <div className={`text-2xl ${iconColor}`}>
          {icon}
        </div>
      </div>
      <div>
        <h3 className="font-bold">{label}</h3>
        <p>{count} order{count !== 1 ? 's' : ''}</p>
      </div>
    </div>
  );
};

const OrderStatusSummary = () => { 
  const data = useSelector((state) => state.orders);
  const orders = data?.data?.data ?? [];
  
  const statusSummary = orders?.reduce(
    (acc, order) => {
      if (order?.status === "complete") acc.completed += 1;
      if (order?.status === "pending") acc.pending += 1;
      if (order?.status === "canceled") acc.canceled += 1;
      return acc;
    },
    { completed: 0, pending: 0, canceled: 0 }
  );
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8">
      <OrderSummaryBox type="completed" count={statusSummary.completed} label="Completed orders" />
      <OrderSummaryBox type="canceled" count={statusSummary.canceled} label="Canceled orders" />
      <OrderSummaryBox type="pending" count={statusSummary.pending} label="pending orders" />
    </div>
  );
};

export default OrderStatusSummary;
