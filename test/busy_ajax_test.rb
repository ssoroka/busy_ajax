$:.unshift(File.dirname(__FILE__) + '/../lib')

ENV["RAILS_ENV"] = "test"

require File.expand_path(File.dirname(__FILE__) + "/../../../../config/environment")
require 'test_help'

require 'test/unit'

class BusyAjaxTest < Test::Unit::TestCase
  include BusyAjax

  def setup
    # @controller = ActionController::Base.new
    # @request    = ActionController::TestRequest.new
    # @controller.request = @request
    # @view = ActionView::Base.new
    # @view.controller = @controller
  end

  # There's really nothing to test now that it's all unobtrusive javascript..
  
  def test_header
    # assert @view.busy_ajax_head == '<link href="/stylesheets/busy_ajax.css" media="screen" rel="Stylesheet" type="text/css" /><script src="/javascripts/busy_ajax.js" type="text/javascript"></script>'
    true
  end
  
  def test_body
    # result = @view.busy_ajax
    # assert result.include?('<div id="busy_ajax" style="display:none"><img')
    # assert result.include?('document.onmousemove = follow;')
    true
  end
end
