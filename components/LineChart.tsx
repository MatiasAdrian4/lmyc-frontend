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

export interface Dataset {
  /** Dataset label */
  label: string
  /** Dataset data */
  data: number[]
  /** Line's border color */
  borderColor: string
  /** Line's background color */
  backgroundColor: string
}

interface LineChartProps {
  /** Labels in the X */
  labels: string[]
  /** Data to be render in the graph. Each dataset represents a line */
  datasets: Dataset[]
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
