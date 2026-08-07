function About() {
    return (
        /* The outer div handles full page centering for everything inside it */
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100vw',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h2>About</h2>
            <p className="lead mt-3" style={{ maxWidth: '600px' }}>
                This Student Management System is built via 
                React, Spring Boot, REST APIs, MySQL, Axios and
                Bootstrap.
            </p>
        </div>
    );
}

export default About;
