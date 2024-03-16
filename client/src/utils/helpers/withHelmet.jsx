import { Helmet } from 'react-helmet';

const withHelmet = (Component, title) => props => (
  <>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Component {...props} />
  </>
);

export default withHelmet;