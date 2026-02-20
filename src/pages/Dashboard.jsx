import '../styles/Dashboard.css'
import { Line, Bar, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

function Dashboard() {
  return (
    <div className='dashboardcontainer'>
      
      {/* Title */}
      <div className='title'>
        <p>Dashboard</p>
      </div>

      {/* Cards Row */}
      <div className='card-row'>
        <Card icon="📊" title="Total Session" content="130" />
        <Card icon="⏱️" title="Productive Session" content="78%" addition="Productive" />
        <Card icon="⌛" title="Average Duration" content="1hr 20min" />
        <Card icon="🌙" title="Best Study Time" content="Evening Hours" />
      </div>

      {/* Analytics Section */}
      <div className='dashboardbot'>
        <div className='analytics'>
          
          <div className='analyticstop'>
            <div className='analyticstopholder'>
              <Analytics title="Productivity Overtime" type="line" />
            </div>
            <div className='analyticstopholder'>
              <Analytics title="Productivity by Subject" type="bar" />
            </div>
          </div>
          
          <div className='analyticsbot'>
            <Analytics title="Recent Study Session" type="horizontal-bar" />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className='right'>
          <h3>Quick Stats</h3>
          <MiniAnalytics type="doughnut" />
        </div>
      </div>

    </div>
  )
}

// Card Component
function Card({icon, title, content, addition}) {
  return (
    <div className='card'>
      <div className='iconandheader'>
        <span>{icon}</span>
        <h3>{title}</h3>
      </div>
      <div className='contentandaddition'>
        <h1>{content}</h1>
        {addition && <p>{addition}</p>}
      </div>
    </div>
  )
}

// Analytics Chart Component
function Analytics({title, type}) {
  let data = {}
  let options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: false },
    },
  }

  if(type === 'line' || type === 'bar') {
    data = {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [{
        label: 'Hours Studied',
        data: [1.5, 2, 1, 2.5, 3, 2, 1.8],
        backgroundColor: type === 'bar' ? 'rgba(108,99,255,0.6)' : 'rgba(108,99,255,0.2)',
        borderColor: 'rgba(108,99,255,1)',
        borderWidth: 2,
        fill: true,
      }]
    }
  }

  if(type === 'horizontal-bar') {
    data = {
      labels: ['Math', 'Networking', 'React', 'Database'],
      datasets: [{
        label: 'Hours Studied',
        data: [3, 2, 4, 1],
        backgroundColor: ['#6C63FF','#FF6384','#36A2EB','#FFCE56'],
      }]
    }

    options = {
      indexAxis: 'y',
      responsive: true,
      plugins: {
        legend: { display: true, position: 'top' },
        title: { display: false },
      },
      scales: {
        x: { beginAtZero: true }
      }
    }
  }

  return (
    <div>
      <h3>{title}</h3>
      {type === 'line' && <Line data={data} options={options} />}
      {type === 'bar' && <Bar data={data} options={options} />}
      {type === 'horizontal-bar' && <Bar data={data} options={options} />}
    </div>
  )
}

// Mini chart for right sidebar
function MiniAnalytics({type}) {
  const data = {
    labels: ['Completed', 'In Progress', 'Missed'],
    datasets: [{
      data: [12,5,2],
      backgroundColor: ['#28a745','#ffc107','#dc3545'],
    }]
  }
  return (
    <div style={{height:200, width:'100%'}}>
      {type === 'doughnut' && <Pie data={data} options={{responsive:true}} />}
    </div>
  )
}

export default Dashboard