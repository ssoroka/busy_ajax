require 'busy_ajax'
require 'fileutils'

ActionView::Base.send :include, BusyAjax

# Copy the files! Play nice if the file exists and they're identical.
source_path = File.dirname(__FILE__)
dest_path = File.join(RAILS_ROOT, 'public')

%w(javascripts images).each{|folder|
  files = Dir[File.join(source_path, folder, '*.*')]
  files.each{|file|
    dest_file = File.join(dest_path, folder, file.split(/(\/|\\)/).last)
    unless File.exist?(dest_file) && FileUtils.identical?(file, dest_file)
      puts "BusyAjax is copying #{file.gsub(RAILS_ROOT, '')} to #{dest_file.gsub(RAILS_ROOT, '')}"
      FileUtils.copy(file, dest_file)
    end
  }
}
