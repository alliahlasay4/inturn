import Button from './Button';

function LogoutButton() {
  const handleLogout = () => {
    // Clear fake auth and go back to login
    localStorage.removeItem('auth');
    window.location.href = '/loginpage';
  };

  return (
    <Button
      text="Logout"
      type="outline"
      onClick={handleLogout}
      className="text-sm px-3 py-1"
    />
  );
}

export default LogoutButton;

