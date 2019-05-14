import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const errorPage =({statusCode}) => {
return <div>
    <Layout>
        {statusCode ? `Could not load data: Status code ${statusCode}`
         : `Could not load data`}
    </Layout>
</div>
}

export default errorPage;