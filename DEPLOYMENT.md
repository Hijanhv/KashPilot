# KashPilot Deployment Checklist

## Pre-Deployment

### Environment Setup
- [ ] Node.js 18+ installed
- [ ] npm dependencies installed (`npm install`)
- [ ] `.env` file created from `.env.example`

### Wallet Configuration
- [ ] Agent wallet generated (`node scripts/generate-wallet.js`)
- [ ] Private key added to `.env` as `AGENT_PRIVATE_KEY`
- [ ] Wallet address added to `.env` as `AGENT_WALLET_ADDRESS`
- [ ] Wallet funded with Celo Alfajores testnet tokens
- [ ] Balance verified (minimum 0.5 CELO recommended)

### API Keys
- [ ] OpenAI API key obtained
- [ ] OpenAI API key added to `.env` as `OPENAI_API_KEY`
- [ ] API key tested and has available credits

### Smart Contracts (Optional but Recommended)
- [ ] `AgentIdentity.sol` deployed to Alfajores
- [ ] `X402Payment.sol` deployed to Alfajores
- [ ] Contract addresses added to `.env`
- [ ] Agent registered with ERC-8004 (`node scripts/register-agent.js`)
- [ ] Contracts verified on CeloScan

## Development Testing

### Local Testing
- [ ] Web app runs without errors (`npm run dev`)
- [ ] Landing page loads correctly
- [ ] Dashboard displays wallet data
- [ ] Agent control panel functions
- [ ] Activity page shows transactions
- [ ] UI is responsive on mobile

### Agent Testing
- [ ] Agent runner starts (`npm run agent`)
- [ ] Agent status API responds
- [ ] Mode changes work
- [ ] Commands execute
- [ ] Logs appear in UI
- [ ] Cron jobs trigger every 3 minutes

### Blockchain Testing
- [ ] Wallet connection works
- [ ] Balance displays correctly
- [ ] Transactions execute
- [ ] Transaction hashes appear
- [ ] CeloScan links work

### AI Testing
- [ ] OpenAI API responds
- [ ] Agent makes decisions
- [ ] Decisions make sense for mode
- [ ] Thinking logs are meaningful
- [ ] Error handling works

## Production Preparation

### Code Quality
- [ ] No console errors in browser
- [ ] No TypeScript errors (`npm run build`)
- [ ] All API endpoints respond correctly
- [ ] Error handling implemented
- [ ] Loading states implemented

### Security Review
- [ ] `.env` added to `.gitignore`
- [ ] Private keys never committed
- [ ] API keys secured
- [ ] Input validation added
- [ ] Rate limiting considered

### Performance
- [ ] Build completes successfully (`npm run build`)
- [ ] Pages load quickly
- [ ] No memory leaks
- [ ] API responses are fast
- [ ] Database queries optimized

### Documentation
- [ ] README.md complete
- [ ] SETUP.md accurate
- [ ] API documentation current
- [ ] Code comments added
- [ ] Deployment guide ready

## Deployment

### Vercel Deployment (Recommended)
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported to Vercel
- [ ] Environment variables added in Vercel
- [ ] Build settings configured
- [ ] Deployment successful
- [ ] Production URL works

### Custom Server Deployment
- [ ] Server provisioned
- [ ] Node.js installed on server
- [ ] Code deployed to server
- [ ] `.env` configured on server
- [ ] Dependencies installed
- [ ] PM2 or similar process manager configured
- [ ] Nginx/Apache configured
- [ ] SSL certificate installed
- [ ] Domain configured

## Post-Deployment

### Verification
- [ ] Production site loads
- [ ] All pages accessible
- [ ] Wallet connects
- [ ] Agent runs
- [ ] Transactions execute
- [ ] No console errors

### Monitoring
- [ ] Error tracking setup (Sentry, etc.)
- [ ] Analytics installed (Google Analytics, etc.)
- [ ] Uptime monitoring configured
- [ ] Agent activity monitored
- [ ] Transaction logs reviewed

### Maintenance
- [ ] Backup strategy implemented
- [ ] Update plan established
- [ ] Security monitoring active
- [ ] Agent wallet balance monitored
- [ ] Support channels ready

## Launch

### Pre-Launch
- [ ] All checklist items completed
- [ ] Team notified
- [ ] Documentation finalized
- [ ] Support ready

### Launch
- [ ] Announcement prepared
- [ ] Social media posts ready
- [ ] Community informed
- [ ] Press release sent (if applicable)

### Post-Launch
- [ ] Monitor for issues
- [ ] Respond to feedback
- [ ] Track metrics
- [ ] Plan next iteration

## Troubleshooting

### Common Issues

**Build fails:**
- Check TypeScript errors
- Verify all imports
- Check environment variables

**Agent doesn't run:**
- Verify private key
- Check wallet balance
- Review OpenAI API key

**Transactions fail:**
- Check network connection
- Verify wallet has CELO
- Review contract addresses

**UI doesn't load:**
- Check build output
- Review browser console
- Verify API endpoints

## Support

If you encounter issues:
1. Check the main README.md
2. Review error logs
3. Check GitHub Issues
4. Ask in community Discord

---

**Remember:** This is testnet software. Never use real funds without proper security audit!
