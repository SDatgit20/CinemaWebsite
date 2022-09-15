import React from 'react';
import { Box, Card, Container } from "@material-ui/core";
import Header from "../header/Header";
import styles from "./styles/layoutStyles";
import RootRouter from "../router/RootRouter";
import useAuth from "./hooks/useAuth";
import Footer from '../footer/Footer';

export default () => {
    const classes = styles();
    const { isAuthenticated, handleLogin, handleLogout } = useAuth();

    return (
        <>
            <Box>
                <Header onLogout={handleLogout} isAuthenticated={isAuthenticated} />
                <Container maxWidth={false} className={classes.container}>
                    <Card>
                        <RootRouter isAuthenticated={isAuthenticated} onLogin={handleLogin} />
                    </Card>
                </Container>
            </Box>
            <Footer />
        </>
    )
};
