import React, { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { getResume, saveResume } from '../lib/resumeService';
import { getTemplate, getTemplateTypes } from '../lib/sectionTemplates';
import { uploadProfilePicture } from '../lib/storageService';
import { AVAILABLE_ICONS } from '../lib/iconList';
import { 
  Save, 
  LogOut, 
  Plus, 
  Trash2, 
  Eye, 
  ChevronUp, 
  ChevronDown,
  AlertCircle,
  CheckCircle,
  FileText,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import '../styles/admin.css';

const AdminDashboard = ({ onLogout, onViewResume }) => {
  const [resume, setResume] = useState({
    header: { 
      name: '', 
      title: '',
      phone: '', 
      email: '', 
      location: '',
      profilePicture: '',
      socialLinks: {
        github: '',
        linkedin: '',
        website: ''
      }
    },
    sections: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('blank');
  const [editorPreview, setEditorPreview] = useState({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(null);

  useEffect(() => {
    loadResume();
  }, []);

  // Update page title
  useEffect(() => {
    document.title = 'Admin Dashboard - Personal Resume Builder';
  }, []);

  const loadResume = async () => {
    try {
      setLoading(true);
      const data = await getResume();
      if (data) {
        setResume(data);
      }
    } catch (err) {
      showMessage('error', 'Failed to load resume');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 4000);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveResume(resume);
      showMessage('success', 'Resume saved successfully!');
    } catch (err) {
      showMessage('error', 'Failed to save resume');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (err) {
      showMessage('error', 'Failed to logout');
      console.error(err);
    }
  };

  const updateHeader = (field, value) => {
    setResume(prev => ({
      ...prev,
      header: { ...prev.header, [field]: value }
    }));
  };

  const updateSocialLink = (platform, value) => {
    setResume(prev => ({
      ...prev,
      header: {
        ...prev.header,
        socialLinks: {
          ...prev.header.socialLinks,
          [platform]: value
        }
      }
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      showMessage('info', 'Uploading image...');
      
      const downloadURL = await uploadProfilePicture(file, 'main');
      updateHeader('profilePicture', downloadURL);
      
      showMessage('success', 'Profile picture uploaded successfully!');
    } catch (error) {
      showMessage('error', error.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const updateSectionIcon = (sectionId, iconValue) => {
    setResume(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === sectionId ? { ...section, icon: iconValue } : section
      )
    }));
    setShowIconPicker(null);
  };

  const addSection = (templateType = 'blank') => {
    const template = getTemplate(templateType);
    const newSection = {
      id: `section-${Date.now()}`,
      title: template.title,
      content: template.content,
      order: resume.sections.length
    };
    setResume(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
    setShowTemplateModal(false);
    setSelectedTemplate('blank');
  };

  const handleAddSectionClick = () => {
    setShowTemplateModal(true);
  };

  const updateSection = (id, field, value) => {
    setResume(prev => ({
      ...prev,
      sections: prev.sections.map(section =>
        section.id === id ? { ...section, [field]: value } : section
      )
    }));
  };

  const deleteSection = (id) => {
    if (confirm('Are you sure you want to delete this section?')) {
      setResume(prev => ({
        ...prev,
        sections: prev.sections.filter(section => section.id !== id)
      }));
    }
  };

  const moveSection = (id, direction) => {
    const sections = [...resume.sections].sort((a, b) => a.order - b.order);
    const index = sections.findIndex(s => s.id === id);
    
    if (direction === 'up' && index > 0) {
      [sections[index], sections[index - 1]] = [sections[index - 1], sections[index]];
    } else if (direction === 'down' && index < sections.length - 1) {
      [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
    }
    
    // Update order numbers
    const updatedSections = sections.map((section, idx) => ({
      ...section,
      order: idx
    }));
    
    setResume(prev => ({ ...prev, sections: updatedSections }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Resume Admin</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={onViewResume}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">View Resume</span>
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save'}</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Message */}
      {message.text && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className={`p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Header Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={resume.header.name}
                onChange={(e) => updateHeader('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
              <input
                type="text"
                value={resume.header.title || ''}
                onChange={(e) => updateHeader('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Senior Product Manager"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={resume.header.email}
                onChange={(e) => updateHeader('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="text"
                value={resume.header.phone}
                onChange={(e) => updateHeader('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={resume.header.location}
                onChange={(e) => updateHeader('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="City, State"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture (Optional)</label>
              <div className="flex items-center gap-4">
                {resume.header.profilePicture && (
                  <img 
                    src={resume.header.profilePicture} 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploadingImage}
                    className="hidden"
                    id="profile-picture-upload"
                  />
                  <label
                    htmlFor="profile-picture-upload"
                    className={`inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition cursor-pointer ${
                      uploadingImage ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {uploadingImage ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload Picture</span>
                      </>
                    )}
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Max 5MB. Recommended: 400x400px square image
                  </p>
                </div>
                {resume.header.profilePicture && (
                  <button
                    onClick={() => updateHeader('profilePicture', '')}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-md font-semibold text-gray-900 mb-4">Social Links (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                <input
                  type="url"
                  value={resume.header.socialLinks?.github || ''}
                  onChange={(e) => updateSocialLink('github', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                <input
                  type="url"
                  value={resume.header.socialLinks?.linkedin || ''}
                  onChange={(e) => updateSocialLink('linkedin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={resume.header.socialLinks?.website || ''}
                  onChange={(e) => updateSocialLink('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sections */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Resume Sections</h2>
            <button
              onClick={handleAddSectionClick}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Section</span>
            </button>
          </div>

          <div className="space-y-4">
            {resume.sections
              .sort((a, b) => a.order - b.order)
              .map((section, index) => (
                <div key={section.id} className="bg-white rounded-xl shadow-sm p-6">
                  {/* Section Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setShowIconPicker(showIconPicker === section.id ? null : section.id)}
                        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                        title="Change icon"
                      >
                        <ImageIcon className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                        className="text-lg font-semibold text-gray-900 border-0 border-b-2 border-transparent hover:border-gray-300 focus:border-primary-500 focus:ring-0 px-0"
                        placeholder="Section Title"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveSection(section.id, 'up')}
                        disabled={index === 0}
                        className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move up"
                      >
                        <ChevronUp className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => moveSection(section.id, 'down')}
                        disabled={index === resume.sections.length - 1}
                        className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Move down"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setEditorPreview(prev => ({
                          ...prev,
                          [section.id]: prev[section.id] === 'live' ? 'edit' : 'live'
                        }))}
                        className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                        title="Toggle preview"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteSection(section.id)}
                        className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Delete section"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Icon Picker */}
                  {showIconPicker === section.id && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-3">Choose Section Icon:</p>
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-48 overflow-y-auto">
                        {AVAILABLE_ICONS.map((icon) => (
                          <button
                            key={icon.value}
                            onClick={() => updateSectionIcon(section.id, icon.value)}
                            className={`p-2 rounded border-2 transition ${
                              section.icon === icon.value
                                ? 'border-primary-600 bg-primary-50'
                                : 'border-gray-200 hover:border-primary-300 hover:bg-white'
                            }`}
                            title={icon.label}
                          >
                            <span className="text-2xl">{icon.value === 'briefcase' ? '💼' : 
                              icon.value === 'graduation-cap' ? '🎓' :
                              icon.value === 'code' ? '💻' :
                              icon.value === 'award' ? '🏆' :
                              icon.value === 'file-code' ? '📁' :
                              icon.value === 'book-open' ? '📚' :
                              icon.value === 'lightbulb' ? '💡' :
                              icon.value === 'users' ? '👥' :
                              icon.value === 'target' ? '🎯' :
                              icon.value === 'star' ? '⭐' :
                              icon.value === 'trending-up' ? '📈' :
                              icon.value === 'git-branch' ? '🔀' :
                              icon.value === 'database' ? '🗄️' :
                              icon.value === 'globe' ? '🌐' :
                              icon.value === 'heart' ? '❤️' :
                              icon.value === 'zap' ? '⚡' :
                              icon.value === 'shield' ? '🛡️' :
                              icon.value === 'tool' ? '🔧' :
                              icon.value === 'rocket' ? '🚀' : '📄'}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Markdown Editor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content (Markdown) - Click eye icon above to toggle preview
                    </label>
                    <div data-color-mode="light" style={{ minHeight: '400px' }}>
                      <MDEditor
                        value={section.content}
                        onChange={(value) => updateSection(section.id, 'content', value || '')}
                        height={400}
                        preview={editorPreview[section.id] || 'edit'}
                        hideToolbar={false}
                        enableScroll={true}
                        visibleDragbar={false}
                        highlightEnable={false}
                        textareaProps={{
                          style: {
                            minHeight: '350px',
                            height: '350px'
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

            {resume.sections.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <p className="text-gray-500 mb-4">No sections yet. Add your first section to get started.</p>
                <button
                  onClick={handleAddSectionClick}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Section</span>
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Template Selection Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-primary-600" />
                    Choose Section Template
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Select a pre-formatted template to get started quickly
                  </p>
                </div>
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {getTemplateTypes().map((template) => (
                  <button
                    key={template.value}
                    onClick={() => setSelectedTemplate(template.value)}
                    className={`p-4 text-left border-2 rounded-lg transition ${
                      selectedTemplate === template.value
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{template.label}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {template.value === 'experience' && 'Work history with achievements'}
                      {template.value === 'education' && 'Academic background'}
                      {template.value === 'skills' && 'Technical and soft skills'}
                      {template.value === 'summary' && 'Professional overview'}
                      {template.value === 'certifications' && 'Licenses and certifications'}
                      {template.value === 'projects' && 'Notable projects and contributions'}
                      {template.value === 'awards' && 'Awards and recognition'}
                      {template.value === 'publications' && 'Articles, papers, talks'}
                      {template.value === 'volunteer' && 'Volunteer experience'}
                      {template.value === 'blank' && 'Start from scratch'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex items-center justify-between bg-gray-50">
              <p className="text-sm text-gray-600">
                Templates include example formatting you can customize
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => addSection(selectedTemplate)}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                >
                  Add Section
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

