# Deployment Guide - PlaceReady AI

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

#### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/placeready-ai.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"
   - Done! Your app will be live in minutes

3. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Option 2: AWS Amplify

Perfect for AWS-integrated projects.

#### Steps:

1. **Install Amplify CLI**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

2. **Initialize Amplify**
   ```bash
   amplify init
   amplify add hosting
   amplify publish
   ```

3. **Configure Environment Variables**
   - Add AWS credentials in Amplify Console
   - Set up environment variables for production

### Option 3: Docker + AWS ECS

For containerized deployment.

#### Dockerfile:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### Build and Deploy:

```bash
# Build Docker image
docker build -t placeready-ai .

# Run locally
docker run -p 3000:3000 placeready-ai

# Push to AWS ECR
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-south-1.amazonaws.com
docker tag placeready-ai:latest <account-id>.dkr.ecr.ap-south-1.amazonaws.com/placeready-ai:latest
docker push <account-id>.dkr.ecr.ap-south-1.amazonaws.com/placeready-ai:latest
```

### Option 4: Traditional Hosting (VPS)

For self-hosted deployment.

#### Steps:

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Use PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "placeready-ai" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx as reverse proxy**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔐 Environment Variables

Create `.env.production` file:

```env
# AWS Configuration
AWS_REGION=ap-south-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# Amazon Bedrock
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your_nextauth_secret

# Database
DYNAMODB_TABLE_NAME=placeready-users
```

## 📊 Performance Optimization

### 1. Enable Caching

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

### 2. Image Optimization

Use Next.js Image component:
```jsx
import Image from 'next/image';

<Image 
  src="/logo.png" 
  alt="Logo" 
  width={200} 
  height={50}
  priority
/>
```

### 3. Code Splitting

Next.js automatically code-splits by route. For additional optimization:

```jsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
});
```

## 🔍 Monitoring & Analytics

### 1. Vercel Analytics

```bash
npm install @vercel/analytics
```

```jsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 2. AWS CloudWatch

Configure CloudWatch for Lambda functions and API Gateway.

### 3. Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

## 🧪 Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test all pages and features
- [ ] Check mobile responsiveness
- [ ] Verify environment variables
- [ ] Test API endpoints (when implemented)
- [ ] Check console for errors
- [ ] Optimize images
- [ ] Enable compression
- [ ] Set up SSL certificate
- [ ] Configure CDN
- [ ] Set up monitoring
- [ ] Create backup strategy
- [ ] Document deployment process

## 🔄 CI/CD Pipeline

### GitHub Actions Example:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📱 Mobile App Deployment (Future)

### React Native / Expo

1. **Build for iOS**
   ```bash
   expo build:ios
   ```

2. **Build for Android**
   ```bash
   expo build:android
   ```

3. **Submit to App Stores**
   - Apple App Store: Use Xcode
   - Google Play Store: Use Play Console

## 🌐 Domain & DNS Configuration

### Recommended DNS Settings:

```
Type    Name    Value                   TTL
A       @       76.76.21.21            3600
CNAME   www     placeready-ai.vercel.app  3600
```

## 🔒 Security Best Practices

1. **Enable HTTPS** - Always use SSL/TLS
2. **Set Security Headers** - CSP, HSTS, X-Frame-Options
3. **Rate Limiting** - Prevent abuse
4. **Input Validation** - Sanitize all inputs
5. **Environment Variables** - Never commit secrets
6. **Regular Updates** - Keep dependencies updated
7. **Backup Strategy** - Regular database backups

## 📈 Scaling Strategy

### Phase 1: Single Server (0-1K users)
- Vercel/Amplify hosting
- Serverless functions
- DynamoDB on-demand

### Phase 2: Distributed (1K-10K users)
- Multi-region deployment
- CloudFront CDN
- DynamoDB provisioned capacity
- Lambda concurrency limits

### Phase 3: Enterprise (10K+ users)
- Auto-scaling groups
- Load balancers
- Database read replicas
- Caching layer (Redis)
- Message queues (SQS)

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Deployment Fails
- Check environment variables
- Verify build logs
- Test locally first
- Check resource limits

### Performance Issues
- Enable caching
- Optimize images
- Use CDN
- Implement lazy loading
- Monitor with CloudWatch

## 📞 Support

For deployment issues:
- Check Next.js documentation
- Review Vercel/AWS documentation
- Contact support team

---

**Ready to Deploy! 🚀**
