import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';


const AuthContainer: React.FunctionComponent = props => {
    const { children} = props;

    return (
        <Container>
            <Row>
                <Col 
                    xs={{ size: 10, offset: 1 }} 
                    sm={{ size: 8, offset: 2 }} 
                    md={{ size: 6, offset: 3 }} 
                    lg={{ size: 4, offset: 4 }}
                >
                    <Card className='mt-5'>
                        <CardBody>
                            {children}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default AuthContainer;