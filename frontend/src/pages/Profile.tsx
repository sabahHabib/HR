import React, { useState, useEffect } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { FaUser, FaSave } from 'react-icons/fa';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

function Profile() {
  const { profile, profileExists, fetchProfile, createProfile, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    cnic: '',
    phone_no: '',
    address: '',
    blood_group: '',
    gender: '',
    department: '',
    user_id: '',
    image_url: null as File | null,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);


  useEffect(() => {
    if (profile) {
      setFormData({
        cnic: profile.cnic || '',
        phone_no: profile.phone_no || '',
        address: profile.address || '',
        blood_group: profile.blood_group || '',
        gender: profile.gender || '',
        department: profile.department || '',
        user_id: profile.user_id || '',
        image_url: profile.image_url || null,
       });
    }
  }, [profile]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files ? event.target.files[0] : null;
  setFormData((prevData) => ({
    ...prevData,
    image_url: file,

  }));

}

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const form = new FormData();
    form.append('cnic', formData.cnic);
    form.append('phone_no', formData.phone_no);
    form.append('address', formData.address);
    form.append('blood_group', formData.blood_group);
    form.append('gender', formData.gender);
    form.append('department', formData.department);


   if (formData.image_url && formData.image_url instanceof File) {
    form.append('file', formData.image_url);
  }



    if (profileExists) {
      await updateProfile(form);
      setIsEditing(false);
    } else {
      await createProfile(form);
    }
  }

  return (
    <section style={{ backgroundColor: '#f7f7f7' }}>
      <Container className="py-5">
        <Row>
          <Col lg={4}>
            <Card className="mb-4">
              <Card.Body className="text-center">
                <img
                  src={profile?.image_url ? `http://localhost:8000${profile.image_url}` :
                  'https://i.pinimg.com/564x/e2/be/f3/e2bef346ae5be671b272a9f102629762.jpg'}
                  alt="Profile"
                  className="rounded-circle img-fluid"
                  style={{ width: '150px' }}
                />

                <h5 className="my-3">{profile ? profile.user.name : ''}</h5>
                <p className="text-muted mb-4">
                  <strong>Employee ID:</strong> {profile?.user_id || ''}
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={8}>
            {!isEditing ? (
              <Card className="mb-4">
                <Card.Body>
                  <Row>
                    <Col sm={3}><strong>Full Name</strong></Col>
                    <Col sm={9}>{profile ? profile.user.name : ''}</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm={3}><strong>Email</strong></Col>
                    <Col sm={9}>{profile ? profile.user.email : ''}</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm={3}><strong>Phone</strong></Col>
                    <Col sm={9}>{profile?.phone_no || ''}</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm={3}><strong>Address</strong></Col>
                    <Col sm={9}>{profile?.address || ''}</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm={3}><strong>Blood Group</strong></Col>
                    <Col sm={9}>{profile?.blood_group || ''}</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm={3}><strong>Gender</strong></Col>
                    <Col sm={9}>{profile?.gender || ''}</Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col sm={3}><strong>Department</strong></Col>
                    <Col sm={9}>{profile?.department || ''}</Col>
                  </Row>
                  <Button variant="outline-primary" className="mt-3 w-100" onClick={() => setIsEditing(true)}>
                    <FaUser />  {profileExists ? 'Update Profile' : 'Create Profile'}
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              <Card className="mb-4">
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="cnic">
                        <Form.Label>CNIC</Form.Label>
                        <Form.Control
                          type="text"
                          name="cnic"
                          value={formData.cnic}
                          onChange={handleChange}
                          placeholder="XXXX-XXXXXXXX-X"
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="phone_no">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone_no"
                          value={formData.phone_no}
                          onChange={handleChange}
                          placeholder="+92-xxx-xxxxxxx"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter your Address"
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="blood_group">
                        <Form.Label>Blood Group</Form.Label>
                        <Form.Control
                          type="text"
                          name="blood_group"
                          value={formData.blood_group}
                          onChange={handleChange}
                          placeholder="Enter your blood group"
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                          type="text"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="department">
                        <Form.Label>Department</Form.Label>
                        <Form.Control
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="image_url">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                          type="file"
                          name="image_url"
                          onChange={handleImageChange}
                        />
                      </Form.Group>
                    </Row>

                    <Button type="submit" variant="success" className="w-100 mt-3">
                      <FaSave /> {profileExists ? 'Update Profile' : 'Create Profile'}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Profile;
