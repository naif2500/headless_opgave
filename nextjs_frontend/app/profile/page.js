// app/profile/page.js
import CreateBookForm from '../../components/CreateBookForm'; // Ensure this path is correct!

export default function ProfilePage() {
  return (
    <div className="page">
      <h1 className="page-title">Min Profil</h1>
      
      {/* Ensure the component is actually here */}
      <div className="form-wrapper">
        <CreateBookForm />
      </div>
    </div>
  );
}