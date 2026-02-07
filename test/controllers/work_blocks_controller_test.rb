require "test_helper"

class WorkBlocksControllerTest < ActionDispatch::IntegrationTest
  test "should get finish" do
    get work_blocks_finish_url
    assert_response :success
  end
end
