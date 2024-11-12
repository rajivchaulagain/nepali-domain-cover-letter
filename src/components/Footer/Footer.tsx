import { Container, Group, Text } from "@mantine/core"
import classes from './Footer.module.css';

export const Footer = () => {
    return (
        <Container className={classes.footer}>
            <Text c="dimmed" size="sm">
                © {new Date().getFullYear()} All rights reserved.
            </Text>
        </Container>
    )
}