import { apiProxy } from 'next-tinacms-github';

export default apiProxy(process.env.SIGNING_KEY);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}
