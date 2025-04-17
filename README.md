
# Website Builder Platform

A full-featured website builder platform where users can create and publish websites from pre-built templates.

## Features

- Choose from built-in website templates:
  - Education Website (Home, About Us, Courses, Admissions, Faculty, Contact)
  - Portfolio Website (Home, Projects, About, Resume, Blog, Contact)
  - E-commerce Website (Home, Shop, Products, Categories, Cart, Checkout, FAQ, About, Contact)
  - Appointment Booking Website (Home, Services, Book Now, Our Team, Testimonials, About, Contact)
- Edit and customize all content, design, and structure with an intuitive interface
- Manage multiple pages per website with easy navigation
- Preview websites in real-time with responsive design checks
- Publish websites directly from the platform
- User authentication with Supabase
- Database and storage with Supabase for saving websites, user data, and assets

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd website-builder
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
Copy the `.env.local.example` file to create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Update the values in `.env.local` with your Supabase project information:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_APP_NAME=Website Builder
VITE_APP_URL=http://localhost:5173
```

4. Run the development server:
```bash
npm run dev
# or
bun dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser to see the application.

## Supabase Setup

1. Create a Supabase project at [https://supabase.com/](https://supabase.com/)
2. Once your project is created, go to the project settings to find your project URL and anon key
3. Update your `.env.local` file with your Supabase project URL and anon key
4. In the Supabase dashboard, go to Authentication > Settings:
   - Set your site URL to http://localhost:5173 (for development)
   - Add http://localhost:5173/* to the redirect URLs
   - Disable email confirmations for easier testing (optional)

## Production Deployment

The project is ready to be deployed to platforms like Vercel:

1. Connect your Git repository to Vercel
2. Add the environment variables from your `.env.local` file to Vercel
3. Deploy the application

For production:
- Update the site URL and redirect URLs in Supabase to your production domain
- Enable email confirmations for better security

## License

This project is licensed under the MIT License - see the LICENSE file for details.
