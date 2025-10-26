import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Trash2, Play, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function VideoUploader() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await base44.auth.me();
      if (!currentUser || currentUser.role !== 'admin') {
        navigate(createPageUrl("Home"));
        return;
      }
      setUser(currentUser);
    } catch (error) {
      navigate(createPageUrl("Home"));
    }
    setLoading(false);
  };

  const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: () => base44.entities.Video.list('-created_date'),
    enabled: !!user,
    initialData: []
  });

  const uploadMutation = useMutation({
    mutationFn: async (file) => {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      return file_url;
    },
    onSuccess: async (file_url) => {
      await base44.entities.Video.create({
        title: formData.title,
        description: formData.description,
        file_url: file_url,
        file_size: selectedFile.size
      });
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      setSelectedFile(null);
      setFormData({ title: '', description: '' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Video.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
    }
  });

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'video/mp4') {
      setSelectedFile(file);
      if (!formData.title) {
        setFormData({ ...formData, title: file.name.replace('.mp4', '') });
      }
    } else {
      alert('Please select an MP4 video file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !formData.title) {
      alert('Please select a file and enter a title');
      return;
    }

    setUploading(true);
    try {
      await uploadMutation.mutateAsync(selectedFile);
    } catch (error) {
      alert('Error uploading video. Please try again.');
    }
    setUploading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center">
        <p className="text-black/60">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[#0A1A2F] mb-2">
            Video Uploader
          </h1>
          <p className="text-sm text-black/60 font-light mb-12">
            Admin Panel - Upload and manage video content
          </p>

          {/* Upload Section */}
          <div className="bg-white p-8 mb-12 border border-black/10">
            <h2 className="text-2xl font-light text-[#0A1A2F] mb-6">
              Upload New Video
            </h2>

            <div className="space-y-6">
              <div>
                <Label className="text-sm font-light tracking-wide text-black/70">
                  Video File (MP4)
                </Label>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="video/mp4"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="flex items-center justify-center gap-3 w-full h-32 border-2 border-dashed border-black/20 hover:border-black/40 transition-colors cursor-pointer bg-[#F8F8F8]"
                  >
                    {selectedFile ? (
                      <div className="text-center">
                        <Play className="w-8 h-8 mx-auto mb-2 text-[#0A1A2F]" />
                        <p className="text-sm font-light text-black">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-black/40 mt-1">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-black/40" />
                        <p className="text-sm font-light text-black/60">
                          Click to select MP4 video
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <Label className="text-sm font-light tracking-wide text-black/70">
                  Video Title
                </Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-2 h-12 border-black/20 focus:border-[#0A1A2F] bg-white"
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <Label className="text-sm font-light tracking-wide text-black/70">
                  Description (Optional)
                </Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="mt-2 min-h-[100px] border-black/20 focus:border-[#0A1A2F] bg-white"
                  placeholder="Enter video description"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || !formData.title || uploading}
                  className="flex-1 h-12 bg-[#0A1A2F] text-white hover:bg-[#0A1A2F]/80 text-sm font-medium tracking-wider"
                >
                  {uploading ? 'UPLOADING...' : 'UPLOAD VIDEO'}
                </Button>
                {selectedFile && (
                  <Button
                    onClick={() => {
                      setSelectedFile(null);
                      setFormData({ title: '', description: '' });
                    }}
                    variant="outline"
                    className="h-12"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Videos List */}
          <div>
            <h2 className="text-2xl font-light text-[#0A1A2F] mb-6">
              Uploaded Videos ({videos.length})
            </h2>

            {videosLoading ? (
              <p className="text-black/60 text-center py-8">Loading videos...</p>
            ) : videos.length === 0 ? (
              <div className="bg-white p-12 text-center border border-black/10">
                <Upload className="w-12 h-12 mx-auto mb-4 text-black/20" />
                <p className="text-black/60 font-light">No videos uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {videos.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 border border-black/10 flex items-start gap-6"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-[#0A1A2F] flex items-center justify-center">
                      <Play className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-[#0A1A2F] mb-1">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-sm text-black/60 font-light mb-2">
                          {video.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-black/40">
                        <span>{(video.file_size / (1024 * 1024)).toFixed(2)} MB</span>
                        <span>•</span>
                        <span>{new Date(video.created_date).toLocaleDateString()}</span>
                      </div>
                      <a
                        href={video.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#0A1A2F] hover:underline mt-2 inline-block"
                      >
                        View File URL
                      </a>
                    </div>

                    <Button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this video?')) {
                          deleteMutation.mutate(video.id);
                        }
                      }}
                      variant="ghost"
                      size="icon"
                      className="text-black/40 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}