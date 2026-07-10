# tedla.dev

Static site built with Jekyll (GitHub Pages gem set).

## Prerequisites

- Ruby (recommended: 3.1+)
- RubyGems (comes with Ruby)
- GCC/Build tools (needed for native gem compilation on some systems)

Check what is installed (safe to run anytime):

```bash
ruby --version
bundler --version
```

If Ruby headers/build tools are missing on Ubuntu/Debian (skip if already installed):

apt:
```bash
sudo apt install ruby3.2-dev build-essential
```

dnf:
```bash
sudo dnf install ruby-devel gcc gcc-c++ make
```

## Gems / Dependencies

This project uses:

- `github-pages` (from `Gemfile`)
  - Includes Jekyll and the GitHub Pages-compatible plugin/theme set

## Setup After Cloning

Run these steps in order:

```bash
# If `bundler --version` fails, install Bundler in your user gem dir:
gem install --user-install bundler

# One-time per clone:
bundle config set --local path 'vendor/bundle'

# Required after cloning, and again whenever Gemfile/Gemfile.lock changes:
bundle install
```

## Build Locally

Generate the static site into `_site/`:

```bash
bundle exec jekyll build
```

## Run Locally

Start local server with live reload:

```bash
bundle exec jekyll serve
```

Default local URL:

- `http://127.0.0.1:4000/`

## Useful Commands

Serve with drafts/future posts (if you use them later):

```bash
bundle exec jekyll serve --drafts --future
```

Clean output and cache:

```bash
bundle exec jekyll clean
```

## Troubleshooting

- If you change `_config.yml` (for example collections), restart `jekyll serve`.
- If gem install fails on native extensions, install your OS build tools and rerun `bundle install`.

## Writing / Front Matter

Always **quote** free-text front-matter values (`title`, `intro`, `hero_alt`,
`hero_caption`) with double quotes. An unquoted value containing a colon-space
(e.g. `intro: The question: why`) is read by YAML as a nested mapping and the
whole document fails to parse — Jekyll then drops its front matter, so it loses
its title/type/date and shows up as an empty "Unknown" entry dated at build time.
Also ensure files have **no UTF-8 BOM** (the `---` must be the very first bytes),
which breaks front matter the same way.

## Image Generation

```bash
./generate-responsive-heroes.sh static/images/hero
```