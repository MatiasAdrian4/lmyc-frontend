import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface DatasetProps {
  label: string
  data: number[]
  borderColor: string
  backgroundColor: string
}

interface LineChartProps {
  labels: string[]
  datasets: DatasetProps[]
}

export const LineChart: React.FC<LineChartProps> = ({
  labels,
  datasets
}: LineChartProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const
      }
    }
  }

  const data = {
    labels,
    datasets: datasets
  }
  return <Line options={options} data={data} />
}
