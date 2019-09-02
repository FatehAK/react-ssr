import React from 'react';

//default `staticContext` to empty obj in case of CSR
const NotFoundPage = ({ staticContext = {} }) => {
    staticContext.notFound = true;
    return <h2>Woah, page not found</h2>;
};

export default {
    component: NotFoundPage
};
