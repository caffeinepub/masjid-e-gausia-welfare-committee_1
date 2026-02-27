import List "mo:core/List";
import Nat "mo:core/Nat";

module {
  // Old types
  type OldAnnouncement = {
    title : Text;
    body : Text;
    date : Int;
  };

  type OldActor = {
    announcementList : List.List<OldAnnouncement>;
  };

  // New types
  type NewAnnouncement = {
    id : Nat;
    title : Text;
    body : Text;
    date : Int;
  };

  type NewActor = {
    announcementList : List.List<NewAnnouncement>;
  };

  // Migration function: updates announcement records to new format
  public func run(old : OldActor) : NewActor {
    let newAnnouncementList = old.announcementList.map<OldAnnouncement, NewAnnouncement>(
      func(oldAnnouncement) {
        { oldAnnouncement with id = 0 };
      }
    );
    { announcementList = newAnnouncementList };
  };
};
