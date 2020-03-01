import React, { Fragment } from 'react';

class AppFooter extends React.Component {

    render() {
        return <Fragment>         
            <footer style={{ padding: "0 50px" }} className="navbar fixed-bottom">            
                <p></p>
                <p className="float-right">© 2020 Noelia Rodríguez Marrón</p>
                <p></p>
            </footer>
        </Fragment>;
    }
}

export default AppFooter;