import '../styles/Dashboard.css'

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
              <Analytics title="Productivity Overtime" table="Graph/Table Placeholder"/>
            </div>
            <div className='analyticstopholder'>
              <Analytics title="Productivity by Subject" table="Graph/Table Placeholder"/>
            </div>
          </div>
          
          <div className='analyticsbot'>
            <Analytics title="Recent Study Session" table="Graph/Table Placeholder"/>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className='right'>
          Right Sidebar / Widgets
        </div>
      </div>

    </div>
  )
}

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

function Analytics({title, table}) {
  return (
    <div>
      <h3>{title}</h3>
      <div>{table}</div>
    </div>
  )
}

export default Dashboard
