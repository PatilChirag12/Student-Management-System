function Home() {
    return (
        <div className="container mt-5" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h1>Welcome to Student Management System</h1>
            <p className="lead mt-3" style={{ maxWidth: '600px' }}>
                This page manages Records of Students efficiently via React,
                SpringBoot and MySQL 
            </p>
        </div>
    );
}

export default Home;
