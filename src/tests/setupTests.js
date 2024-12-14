// Mock Vite's import.meta.env
global.import = {
  meta: {
    env: {
      VITE_SUPABASE_URL: 'http://localhost:3000',
      VITE_SUPABASE_ANON_KEY: 'test-key'
    }
  }
};

// Setup other test environment configurations here
