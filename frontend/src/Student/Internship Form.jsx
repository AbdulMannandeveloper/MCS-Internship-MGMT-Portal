import React from 'react';

const InternshipForm = ({ onClose, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form data collection and validation would go here
    onSubmit({
      // Sample data structure
      type: e.target.type.value,
      officer: e.target.officer.value,
      organization: e.target.organization.value,
      // ... other fields
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        width: '80%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ margin: 0 }}>Add New Internship</h2>
          <button 
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              color: '#7f8c8d'
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500'
              }}>Internship Type</label>
              <select 
                name="type"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
                required
              >
                <option value="">Select Type</option>
                <option value="Summer">Summer</option>
                <option value="Winter">Winter</option>
                <option value="Semester">Semester</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500'
              }}>Reporting Officer</label>
              <input 
                type="text" 
                name="officer"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500'
              }}>Organization</label>
              <input 
                type="text" 
                name="organization"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500'
              }}>Contact Number</label>
              <input 
                type="text" 
                name="contact"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500'
              }}>Email</label>
              <input 
                type="email" 
                name="email"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500'
              }}>Website</label>
              <input 
                type="url" 
                name="website"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500'
              }}>Duration (weeks)</label>
              <input 
                type="number" 
                name="duration"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500'
              }}>Year of Completion</label>
              <input 
                type="number" 
                name="year"
                min="2000"
                max="2099"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '15px' }}>File Uploads</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>Evidences</label>
                <input 
                  type="file" 
                  name="evidences"
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>Survey 1</label>
                <input 
                  type="file" 
                  name="survey1"
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>Survey 2</label>
                <input 
                  type="file" 
                  name="survey2"
                  style={{ width: '100%' }}
                  required
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>Survey 3</label>
                <input 
                  type="file" 
                  name="survey3"
                  style={{ width: '100%' }}
                  required
                />
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <a 
              href="/surveys.zip" 
              download
              style={{
                backgroundColor: '#3498db',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'background-color 0.3s',
                ':hover': {
                  backgroundColor: '#2980b9'
                }
              }}
            >
              Download Survey Templates
            </a>

            <div>
              <button 
                type="button"
                onClick={onClose}
                style={{
                  backgroundColor: '#95a5a6',
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  marginRight: '10px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.3s',
                  ':hover': {
                    backgroundColor: '#7f8c8d'
                  }
                }}
              >
                Cancel
              </button>
              <button 
                type="submit"
                style={{
                  backgroundColor: '#2ecc71',
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.3s',
                  ':hover': {
                    backgroundColor: '#27ae60'
                  }
                }}
              >
                Submit Internship
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InternshipForm;