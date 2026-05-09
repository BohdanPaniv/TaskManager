using AppModels.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataAccess.Configurations
{
    public class BoardListConfiguration : IEntityTypeConfiguration<BoardList>
    {
        public void Configure(EntityTypeBuilder<BoardList> builder)
        {
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Title).IsRequired().HasMaxLength(200);
            builder.Property(t => t.CreatedAt).HasDefaultValueSql("GETUTCDATE()");
            builder.HasOne(t => t.Board)
                .WithMany(l => l.BoardLists)
                .HasForeignKey(t => t.BoardId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
