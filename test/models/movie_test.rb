require 'test_helper'

class MovieTest < ActiveSupport::TestCase

  test "create a movie" do
    assert Movie.new
  end

end
