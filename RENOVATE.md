# Renovate Bot Configuration

This project uses [Renovate Bot](https://github.com/renovatebot/renovate) to automatically keep dependencies up to date.

## Configuration

The Renovate configuration is defined in:
- `renovate.json` - Main configuration file
- `.github/renovate.json5` - Alternative JSON5 format (more readable)

## Features

### Automatic Updates
- **Schedule**: Runs every weekend
- **Auto-merge**: Minor and patch updates for stable packages are automatically merged
- **Grouping**: Related packages are grouped together in single PRs

### Package Rules

1. **Gatsby Core**: Major updates disabled (too risky)
2. **React Packages**: Grouped together, manual review required
3. **Gatsby Plugins**: Grouped together, manual review required
4. **TypeScript Types**: Auto-merged
5. **Dev Dependencies**: Manual review required

### Safety Features
- Limits on concurrent PRs and branches
- Platform automerge for trusted updates
- Detailed PR descriptions with confidence badges

## Setup Instructions

### Option 1: GitHub App (Recommended)
1. Go to [Renovate App](https://github.com/apps/renovate)
2. Click "Install"
3. Select this repository
4. Renovate will automatically start using the configuration files

### Option 2: GitHub Actions (Self-hosted)
1. Create a GitHub Personal Access Token with `repo` scope
2. Add the token as a repository secret named `RENOVATE_TOKEN`
3. The GitHub Actions workflow will run automatically

### Option 3: Local Development
```bash
# Install Renovate CLI
npm install -g renovate

# Run locally
renovate --token YOUR_GITHUB_TOKEN
```

## Configuration Options

### Schedule
- `every weekend` - Runs every Saturday and Sunday
- `before 4am` - Runs before 4 AM
- `after 10pm` - Runs after 10 PM
- `every weekday` - Runs Monday through Friday

### Update Types
- `patch` - Bug fixes (0.0.x)
- `minor` - New features (0.x.0)
- `major` - Breaking changes (x.0.0)

### Automerge Settings
- `automerge: true` - Automatically merge PRs
- `automergeType: 'pr'` - Merge via pull request
- `platformAutomerge: true` - Use GitHub's automerge feature

## Customization

To modify the configuration:

1. Edit `renovate.json` or `.github/renovate.json5`
2. Commit and push changes
3. Renovate will use the new configuration on the next run

## Troubleshooting

### Common Issues
- **Too many PRs**: Adjust `prConcurrentLimit` and `prHourlyLimit`
- **Failed builds**: Check CI configuration and test scripts
- **Merge conflicts**: Enable `rebaseWhen` or `rebaseStalePrs`

### Useful Commands
```bash
# Check current configuration
renovate --print-config

# Dry run (no PRs created)
renovate --dry-run

# Debug mode
renovate --log-level=debug
```

## Links
- [Renovate Documentation](https://docs.renovatebot.com/)
- [Configuration Options](https://docs.renovatebot.com/configuration-options/)
- [Package Rules](https://docs.renovatebot.com/configuration-options/#packagerules) 